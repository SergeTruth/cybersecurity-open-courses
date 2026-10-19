window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples turn 'Multi-Stage Dockerfiles for Clean Runtime Images' into concrete defensive .NET review patterns. Examples are focused supporting fragments, not a complete application. C# requires .NET 8 and C# 12, with Microsoft.AspNetCore.App for web-framework APIs; place member declarations in an application type and include standard namespace imports. Extra package requirements are stated where used. Bootstrap configuration, providers, and private storage are trusted application inputs, never request-controlled policy.",
  "codeExamples": [
    {
      "title": "Harden the Multi-Stage Dockerfiles for Clean Runtime Images container build",
      "language": "dockerfile",
      "blurb": "Single-project .NET 8 build: copies the committed lockfile before locked restore and runs as a non-root user. Supply the real project/assembly name; multi-project and central-package layouts need their complete restore inputs copied before restore.",
      "code": "FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build\nWORKDIR /src\nCOPY *.csproj packages.lock.json ./\n# Single-project build: commit the lockfile. Also copy NuGet.Config and any\n# Directory.Build/Packages.props or project references here when the project uses them.\nRUN dotnet restore --locked-mode\nCOPY . ./\nRUN dotnet publish -c Release -o /out --no-restore\n\nFROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime\nWORKDIR /app\nRUN adduser --disabled-password --gecos \"\" appuser\nUSER appuser\nCOPY --from=build /out ./\nENTRYPOINT [\"dotnet\", \"SecureDockerM03MultiStageDockerfilesClean.dll\"]\n"
    },
    {
      "title": "Gate Multi-Stage Dockerfiles for Clean Runtime Images in CI",
      "language": "bash",
      "blurb": "Run in one project directory after enabling and committing its NuGet lockfile. CI rejects a missing lockfile, tests, and publishes that same project. This does not generate or attest an SBOM; add a separately reviewed SBOM tool if required.",
      "code": "#!/usr/bin/env bash\nset -euo pipefail\n\n# Run from the single project directory; commit packages.lock.json first.\n[[ -f packages.lock.json ]] || { echo \"Committed lockfile required\" >&2; exit 1; }\ndotnet restore --locked-mode\ndotnet test --configuration Release --no-restore\ndotnet publish \\\n  --configuration Release \\\n  --no-restore \\\n  -p:ContinuousIntegrationBuild=true\n"
    }
  ]
};
