param(
    [Parameter(Mandatory = $true)]
    [ValidatePattern('^https://github\.com/[^/]+/[^/]+(?:\.git)?$')]
    [string]$Repository
)

$ErrorActionPreference = 'Stop'

if (-not (Test-Path '.git')) {
    git init -b main
}

git add .
$pending = git status --porcelain
if ($pending) {
    git commit -m 'feat: publish 30-day algorithm interview sprint'
}

$origin = git remote get-url origin 2>$null
if ($LASTEXITCODE -ne 0) {
    git remote add origin $Repository
} elseif ($origin -ne $Repository) {
    git remote set-url origin $Repository
}

git branch -M main
git push -u origin main

Write-Host ''
Write-Host '代码已推送。请在 GitHub 的 Settings -> Pages 中选择 GitHub Actions。' -ForegroundColor Green
