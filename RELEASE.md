# Release

1. `pnpm install --frozen-lockfile`
2. `pnpm run typecheck && pnpm test && pnpm run test:python && pnpm run build`
3. Verify `npm pack --dry-run` contains `python/bootstrap.py`, `python/pyproject.toml`, `python/uv.lock`, and `cordis.patch.yml`.
4. Publish through the GitHub Release workflow with npm provenance.
5. Smoke `dsh plugin --profile headless add @morewax/dsh-code-runtime-python` and verify `--dump-config` disables the stock runtime and inserts `code-runtime-python-uv`.
