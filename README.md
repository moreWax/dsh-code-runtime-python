# @morewax/dsh-code-runtime-python

A pure third-party, uv-managed CPython `CodeRuntime` Service Provider for DeepSeek Harness.
It completes the host/process/bootstrap half of the protocol-only upstream
`@deepseek-ai/dsh-code-runtime-python` package without patching the monorepo.

## Install

```bash
dsh plugin --profile <profile> add @morewax/dsh-code-runtime-python
```

The bundle disables the profile's `code-runtime` row and inserts its own `code-runtime-python-uv` provider row. Every run uses a fresh:

```bash
uv run --project <package>/python --locked --no-dev --python 3.12 python -I -B <bootstrap.py>
```

`uv` manages interpreter acquisition; no `pip install`, ambient virtualenv, or
project Python dependencies are used.

## Contract

- `language = 'python'`, `isolation = 'process'`
- top-level `await` and `return`
- async `tools.*` binding bridge over hostile-validated fd-3 JSONL
- ordered stdout/stderr capture, lossless JSON values, typed binding errors
- CPU, address-space, wall-time, frame, and aggregate output limits
- abort/dispose kills the whole process group and awaits exit
- fresh child per run, empty application environment (`uv` receives only its
  own control variables)

This is containment, **not a hard sandbox**: model Python can access filesystem,
network, processes, and native modules as the host user. Do not use it as a
multi-tenant security boundary.

Windows is rejected because the current implementation requires POSIX rlimits
and process-group termination rather than silently weakening the contract.
