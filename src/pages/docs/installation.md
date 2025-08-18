---
layout: "@layouts/DocsLayout.astro"
title: "Installation"
description: "How to install and set up Human"
---

# Installation

Human doesn't require installation. It's just text.

## No Install Required

Human is a plain-text configuration format. You can write it in:
- Notepad
- TextEdit  
- Vim
- VS Code
- On paper (seriously)

```human
# This is valid Human, written anywhere
AGENT helper
  model = "gpt-4"
  
CONSTRAINTS rules
  NEVER lie
  MUST help
```

Save it as `.hmn` file. That's it. You've "installed" Human.

## Why No Install?

Human is a specification, not software. Like Markdown or JSON, it's a way of writing things down. You don't install Markdown—you just write it. Same with Human.

Your AI provider reads Human files directly. No compiler needed. No runtime required. Just text that describes behavior.

## Using Human Today

While you wait for tooling, you can use Human patterns right now:

```python
# Read Human configuration in Python
config = """
CONSTRAINTS safety
  NEVER share_passwords
  MUST be_helpful
  SHOULD be_concise
"""

# Parse it yourself (it's just indented text)
# Apply to your AI calls
```

The patterns work regardless of tooling. The constraints are universal.

## Works in Any Language

Human keywords work in any language. The five levels are universal:

```human
# Japanese safety rules
CONSTRAINTS 安全規則
  決して 個人情報_公開
  決して パスワード_共有
  決して 有害コンテンツ_生成
  必須 質問_回答
  必須 ユーザー_支援
  必須 正確性_維持
  推奨 簡潔_回答
  推奨 例_提供
  回避 専門用語
  回避 推測
  許可 ユーモア_使用

# German quality standards  
CONSTRAINTS Qualitätsstandards
  NIEMALS Kundendaten_weitergeben
  NIEMALS Passwörter_zeigen
  NIEMALS Schaden_verursachen
  MUSS Fragen_beantworten
  MUSS Datenschutz_einhalten
  MUSS Protokoll_führen
  SOLLTE präzise_sein
  SOLLTE Beispiele_geben
  VERMEIDEN Fachjargon
  VERMEIDEN Spekulation
  DARF Humor_verwenden
  DARF Anfragen_ablehnen

# French guidelines
CONSTRAINTS Directives
  JAMAIS exposer_mots_de_passe
  JAMAIS partager_données_privées
  JAMAIS générer_contenu_nuisible
  DOIT répondre_questions
  DOIT respecter_RGPD
  DOIT créer_logs
  DEVRAIT être_concis
  DEVRAIT donner_exemples
  DEVRAIT montrer_empathie
  ÉVITER jargon_technique
  ÉVITER promesses_légales
  PEUT utiliser_humour
  PEUT refuser_demandes
```

Keywords adapt to your language (決して/NIEMALS/JAMAIS = NEVER). Your rules, your language. This makes Human universal while keeping it readable for your team.

## Future Tooling (Coming Soon)

We're building optional tools to make Human even better:

```bash
# One day soon
brew install human
human run agent.hmn
human test safety.hmn
```

These tools will provide:
- Syntax validation
- Runtime enforcement
- Testing framework
- Editor support
- Unix pipe integration

But remember: you don't need these tools to use Human. They just make it nicer.

## Language Implementation

When tooling arrives, it will be:
- Single binary (like `jq` or `ripgrep`)
- No dependencies
- Works everywhere Unix works
- Under 1MB

The implementation is deliberately simple:
- Lexer
- Recursive descent parser
- Direct to structs (no AST)
- 600-800 lines of code total

## For Early Adopters

Want to use Human patterns today?

1. **Write Human files** - Document your AI constraints
2. **Version control them** - Check into git
3. **Share with your team** - It's just text
4. **Apply manually** - Use the patterns in your current setup

Example workflow:
```bash
# Document your AI rules
cat > company-ai-policy.hmn << 'EOF'
CONSTRAINTS company_policy
  NEVER expose_customer_data
  NEVER make_legal_claims
  MUST follow_gdpr
  SHOULD be_helpful
  AVOID technical_jargon
EOF

# Version it
git add company-ai-policy.hmn
git commit -m "Add company AI policy"

# Share it
# Your team can read and understand it
# Even without tooling
```

## Editor Support

For now, treat `.hmn` files as plain text. Syntax highlighting coming soon for:
- VS Code
- Vim
- Emacs
- Sublime Text

Until then, Python or YAML syntax highlighting works reasonably well.

## Platform Support

Human (the specification) works everywhere text works:
- macOS
- Linux
- Windows
- BSD
- Your phone
- Paper notebooks

Human (the future tooling) will support:
- macOS (arm64, x86_64)
- Linux (arm64, x86_64)
- Windows (x86_64)
- FreeBSD (x86_64)

## Getting Updates

Human is experimental. Things will evolve.

```bash
# Future: Check version
human --version

# Future: Update
human update
```

For now, watch the GitHub: [github.com/human-language](https://github.com/human-language)

## Questions

**Q: Can I use Human today?**  
A: Yes. It's just text. Write it, share it, use the patterns.

**Q: When will tools be ready?**  
A: Building in public. Follow the repo for updates.

**Q: What if the spec changes?**  
A: The five constraint levels are permanent. Everything else might evolve.

**Q: Can I contribute?**  
A: Yes. The spec is open. The implementation will be too.

Remember: Human is just text that describes AI behavior. You can start using it right now, with whatever tools you already have.

*No installation required. Just intention.*