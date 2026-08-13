## How Performance Tests Were Conducted

### Execution Profiling & Assembly Analysis
- `perf record -g ./your_benchmark_binary`
  Sampled CPU execution at high frequency to collect runtime profiling
  data. The -g flag captured call-stack graphs during recursive BVH
  traversals.
- `perf report`
  Inspected assembly-level execution to identify hot spots, memory stalls,
  and instruction percentages (e.g., comiss, mov, ja).

### Process Isolation & Measurement Consistency
- `taskset -c 0 ./your_benchmark_binary`
  Pinned execution to a single CPU core to prevent thread migration across
  cores, maintaining cache locality and eliminating OS scheduling noise.

### Hardware Cycle Counting
- `__rdtscp()` Hardware Instruction
  Used serialized CPU cycle counters before and after the execution loop via
  <x86intrin.h>. This provided single-cycle precision, bypassing standard
  wall-clock timing variations.
- Cache Warming
  Executed warmup passes prior to measurement loops to populate L1/L2
  caches and stabilize CPU clock frequencies.

Run perf under taskset using the following syntax:

- Pinned recording:
  taskset -c 0 perf record -g ./your_benchmark_binary

- Pinned stat collection:
  taskset -c 0 perf stat ./your_benchmark_binary

---

## Performance Test Results & Bottleneck Analysis

- Structure-of-Arrays (SoA) Optimization:
  Flattened pointer indirection across bounding box nodes, eliminating
  dependent memory loads and reducing localized single-instruction stalls down
  to distributed 1–3% execution costs.

- Register Pressure & Stack Thrashing:
  Identified that passing excessive array pointers alongside query data
  exceeded the 16 x86-64 general-purpose registers, causing compiler
  register spilling (0x7c(%rsp) stack reloads).

- Recursion Overhead:
  Observed function call prologues and frame setup overhead during recursive
  passes, highlighting the transition path toward stackless iterative
  traversal.
