window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "Two focused examples apply this module's controls to a concrete automation boundary.",
  "codeExamples": [
    {
      "title": "Bind Terraform review to a saved plan digest",
      "language": "bash",
      "blurb": "Terraform creates a plan in a new private artifact directory, plus review JSON and its digest. These identify the artifact, not approval; module 7 authenticates approval independently before apply.",
      "code": "#!/usr/bin/env bash\nset -euo pipefail\numask 077\n\nworkdir=\"${1:?Terraform directory required}\"\n[[ -f \"$workdir/.terraform.lock.hcl\" ]] || exit 66\nruntime=\"${RUNNER_TEMP:?runner temp required}\"\n[[ -d \"$runtime\" && ! -L \"$runtime\" ]] || exit 77\nartifact_dir=\"$(mktemp -d -p \"$runtime\" terraform-review.XXXXXX)\"\nplan=\"$artifact_dir/release.tfplan\"\nreview=\"$artifact_dir/release-plan.json\"\n\nterraform -chdir=\"$workdir\" init -input=false -lockfile=readonly\nterraform -chdir=\"$workdir\" plan -input=false -lock=true -out=\"$plan\"\nterraform -chdir=\"$workdir\" show -json \"$plan\" > \"$review\"\nsha256sum -- \"$plan\" > \"$artifact_dir/release.tfplan.sha256\"\nprintf 'review artifacts: %s\\n' \"$artifact_dir\"\n"
    },
    {
      "title": "Verify a deployment artifact against a signed manifest",
      "language": "bash",
      "blurb": "The artifact name is closed, the manifest signature is checked first, and the selected digest must match before upload.",
      "code": "#!/usr/bin/env bash\nset -euo pipefail\n\nartifact=\"${1:?artifact required}\"\n[[ \"$artifact\" =~ ^dist/orders-[0-9]+\\.[0-9]+\\.[0-9]+\\.tar\\.gz$ ]] || exit 64\ngpgv --keyring ci/release-signers.gpg dist/SHA256SUMS.asc dist/SHA256SUMS\nexpected=\"$(awk -v name=\"${artifact#dist/}\" '$2 == name {print $1}' dist/SHA256SUMS)\"\n[[ \"$expected\" =~ ^[a-f0-9]{64}$ ]] || exit 65\nactual=\"$(sha256sum -- \"$artifact\" | cut -d' ' -f1)\"\n[[ \"$actual\" == \"$expected\" ]] || { printf 'artifact digest mismatch\\n' >&2; exit 65; }\n"
    }
  ]
};
