<p align="center">
  <a href="https://github.com/kasuboski/dev-to-stats-action/actions"><img alt="dev.to stats-action status" src="https://github.com/kasuboski/dev-to-stats-action/workflows/build-test/badge.svg"></a>
</p>

# Get the Article Stats from Dev.to
```yaml
name: Get Stats
on:
  schedule:
    - cron: "*/30 * * * *"

jobs:
  pull-stats:
    runs-on: ubuntu-latest
    name: Get Stats from Dev.to
    steps:
    - uses: kasuboski/dev-to-stats-action@v1
      with:
        apiKey: ${{ secrets.API_KEY }}
```

You need to add a Dev.to API Key as a secret. You can find instructions to get one at [dev.to](https://docs.dev.to/api/#section/Authentication/api_key).

The action will output a file at `dev-to-stats/stats.json` by default, but can be configured with the `outFile` input. The file should look something like below:

```json
{"public_reactions_count":12,"page_views_count":123,"comments_count":0}
```