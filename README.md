# SHORTENER

### How to dev

#### Prepare

Clone the repo
```bash
git clone git@github.com:dannegm/shortener.git
```

Create your own branch to work
```bash
git checkout -b '[username] feature or issue'
```

#### Install

Create your own `.env` file and modify it with your own credentials
```bash
cp .env.example .env && $EDITOR .env
```

Install & run
```bash
npm install && npm run dev
```

### Contribute

1 - Code a few awesome features or hunt&catch bugs

2 - Prepare

a - Commit your changes
```bash
git add -A && git commit -m '[issue_ticket] [commit_mesage]'
```

b - Gather the master changes
```bash
git fetch origin
```

c - Rebasing your branch
```bash
git rebase origin/master
```

You may or may not have to resolve conflicts, modify conflict files and then
```bash
git add [conflicted_files] && git rebase -—continue
```

d - Push it.
```bash
git push origin
```

3 - Create a new Pull Request, be sure to explain your feature/fix issue.

4 - Wait for Pull Response & merge.