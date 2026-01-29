# 📋 Documentação Oficial de Automações - CRM Ploomes

> **Versão:** 1.0  
> **Data:** 26 de Janeiro de 2026  
> **Objetivo:** Documentar todas as automações configuradas no sistema Ploomes para padronização e manutenção.

---

## 1. Automações Gerais de Negócios

> ⚠️ **Nota:** Todas as automações desta seção possuem dois gatilhos: **Criação** e **Edição** de negócio.

---

### 1.1 Preenche cliente e contato responsável com negociador(a) — Criação

| Campo | Descrição |
|-------|-----------|
| **Gatilho** | Criação de Negócio |
| **Filtros/Condições** | Funis: Mesa João Pessoa, SP Carteiras Yasmin/Elson, Mesa 2B, Aquário BBMD |
| **Ações** | • `Negócio > Contato > Responsável` ← puxa de `Usuários Colaboradores` |
| | • `Negócio > Cliente > Responsável` ← puxa de `Responsável` |
| | • `Negócio > Cliente > Usuários Colaboradores` ← puxa de `Usuários Colaboradores` |

---

### 1.2 Preenche cliente e contato responsável com negociador(a) — Edição

| Campo | Descrição |
|-------|-----------|
| **Gatilho** | Edição de Negócio |
| **Filtros/Condições** | Funis: Mesa João Pessoa, SP Carteiras Yasmin/Elson, Mesa 2B, Aquário BBMD |
| **Ações** | • `Negócio > Contato > Responsável` ← puxa de `Usuários Colaboradores` |
| | • `Negócio > Cliente > Responsável` ← puxa de `Responsável` |
| | • `Negócio > Cliente > Usuários Colaboradores` ← puxa de `Usuários Colaboradores` |

---

### 1.3 Preencher título do negócio com escritório — Criação

| Campo | Descrição |
|-------|-----------|
| **Gatilho** | Criação de Negócio |
| **Filtros/Condições** | Funis: Mesa João Pessoa, SP Carteiras Yasmin/Elson, Mesa 2B, Aquário BBMD |
| | + Escritório **Não Vazio** |
| **Ação** | `Negócio > Titulo` ← puxa de `Escritório` |

---

### 1.4 Preencher título do negócio com escritório — Edição

| Campo | Descrição |
|-------|-----------|
| **Gatilho** | Edição de Negócio |
| **Filtros/Condições** | Funis: Mesa João Pessoa, SP Carteiras Yasmin/Elson, Mesa 2B, Aquário BBMD |
| | + Escritório **Não Vazio** |
| **Ação** | `Negócio > Titulo` ← puxa de `Escritório` |

---

### 1.5 Preencher reclamante com cliente — Criação

| Campo | Descrição |
|-------|-----------|
| **Gatilho** | Criação de Negócio |
| **Filtros/Condições** | Funis: Mesa João Pessoa, SP Carteiras Yasmin/Elson, Mesa 2B, Aquário BBMD |
| | + Cliente **Não Vazio** |
| **Ação** | `Negócio > Reclamante` ← puxa de `Cliente` |

---

### 1.6 Preencher reclamante com cliente — Edição

| Campo | Descrição |
|-------|-----------|
| **Gatilho** | Edição de Negócio |
| **Filtros/Condições** | Funis: Mesa João Pessoa, SP Carteiras Yasmin/Elson, Mesa 2B, Aquário BBMD |
| | + Cliente **Não Vazio** |
| **Ação** | `Negócio > Reclamante` ← puxa de `Cliente` |

---

### 1.7 Preencher cliente com reclamante — Criação

| Campo | Descrição |
|-------|-----------|
| **Gatilho** | Criação de Negócio |
| **Filtros/Condições** | Funis: Mesa João Pessoa, SP Carteiras Yasmin/Elson, Mesa 2B, Aquário BBMD |
| | + Cliente **Não Vazio** (Lógica inversa) |
| **Ação** | `Negócio > Cliente` ← puxa de `Reclamante` |

---

### 1.8 Preencher cliente com reclamante — Edição

| Campo | Descrição |
|-------|-----------|
| **Gatilho** | Edição de Negócio |
| **Filtros/Condições** | Funis: Mesa João Pessoa, SP Carteiras Yasmin/Elson, Mesa 2B, Aquário BBMD |
| | + Cliente **Não Vazio** (Lógica inversa) |
| **Ação** | `Negócio > Cliente` ← puxa de `Reclamante` |

---

### 1.9 Preencher negócio responsável com negociador(a) — Criação

| Campo | Descrição |
|-------|-----------|
| **Gatilho** | Criação de Negócio |
| **Filtros/Condições** | Funis: Mesa João Pessoa, SP Carteiras Yasmin/Elson, Mesa 2B, Aquário BBMD |
| | + Negociador **Não Vazio** |
| **Ação** | `Negócio > Responsável` ← puxa de `Negociador` |

---

### 1.10 Preencher negócio responsável com negociador(a) — Edição

| Campo | Descrição |
|-------|-----------|
| **Gatilho** | Edição de Negócio |
| **Filtros/Condições** | Funis: Mesa João Pessoa, SP Carteiras Yasmin/Elson, Mesa 2B, Aquário BBMD |
| | + Negociador **Não Vazio** |
| **Ação** | `Negócio > Responsável` ← puxa de `Negociador` |

---

## 2. Automações de Funis B2C

> 📌 Automações relacionadas à movimentação de cards entre etapas e preenchimento de datas.

---

### 2.1 Preencha o campo Data correspondente (Global)

| Campo | Descrição |
|-------|-----------|
| **Gatilho** | Entrada na etapa |
| **Contexto** | Todas as etapas de funil |
| **Filtros/Condições** | — (Nenhum filtro adicional) |
| **Ação** | `Negócio > Data Entrou [Etapa]` ← recebe `new Date()` |

---

### 2.2 Move Prospect para Avaliação — Entrada na Etapa

| Campo | Descrição |
|-------|-----------|
| **Gatilho** | Entrada na etapa |
| **Etapas** | Leads JPA, 2B, BBMD, SP, SP Elson |
| **Filtros/Condições** | `Marcadores` igual a: |
| | • `CASO SEM TESTE - SUBIDA DE CASO PROSPECT` |
| | **OU** |
| | • `ATIVO - SUBIDA DE CASO SEM TESTE` |
| **Ação** | 🔀 Mover para estágio `Avaliação de Restrição [Mesa]` |

---

### 2.3 Move Prospect para Avaliação — Edição de Marcadores

| Campo | Descrição |
|-------|-----------|
| **Gatilho** | Edição do campo `Marcadores` |
| **Etapas** | Leads JPA, 2B, BBMD, SP, SP Elson |
| **Filtros/Condições** | `Marcadores` igual a: |
| | • `CASO SEM TESTE - SUBIDA DE CASO PROSPECT` |
| | **OU** |
| | • `ATIVO - SUBIDA DE CASO SEM TESTE` |
| **Ação** | 🔀 Mover para estágio `Avaliação de Restrição [Mesa]` |

---

### 2.4 Move Card para Avaliação de Restrição

| Campo | Descrição |
|-------|-----------|
| **Gatilho** | Entrada na etapa |
| **Etapa** | Teste Positivo [Mesa] |
| **Filtros/Condições** | — (Nenhum filtro adicional) |
| **Ação** | 🔀 Mover para estágio `Avaliação de Restrição [Mesa]` |

---

### 2.5 Duplica o Card no funil correspondente Parceiros

| Campo | Descrição |
|-------|-----------|
| **Gatilho** | Entrada na etapa |
| **Etapa** | Avaliação de Restrição [Mesa] |
| **Filtros/Condições** | `Criador` **E** `Atualizador` ≠ `Usuário de Integração` |
| **Ações** | 1️⃣ Editar `Mesa Homologação` = `[Mesa]` |
| | 2️⃣ 📋 Duplicar negócio para novo estágio `Leads Parceiros` |

---

### 2.6 Move Leads com 0,00 de Earnout para No Go

| Campo | Descrição |
|-------|-----------|
| **Gatilho** | Entrada na etapa |
| **Etapa** | Aceite \| Solicitação de contrato (Matriz) [Mesa] |
| **Filtros/Condições** | `Earnout` = `0,00` |
| **Ação** | 🔀 Mover para estágio `No Go [Mesa]` |

---

### 2.7 Enviar Negócio para funil de formalização

| Campo | Descrição |
|-------|-----------|
| **Gatilho** | Entrada na etapa |
| **Etapa** | Aceite \| Solicitação de Contrato (Matriz) [Mesa] |
| **Filtros/Condições** | `Earnout` ≠ `0,00` |
| **Ação** | 📋 Duplicar negócio para estágio `REVISÃO DE PROPOSTA` |

---

### 2.8 Perder negócios Restritos (Saneamento)

| Campo | Descrição |
|-------|-----------|
| **Gatilho** | Entrada na etapa |
| **Etapa** | Restrito [Mesa] |
| **Filtros/Condições** | `Criador` **E** `Atualizador` = `Usuário de Integração` |
| **Ação** | ❌ Perder Negócio |
| | **Motivo:** `Restrito - pós saneamento` |

---

## 3. Automações de Funis Parceiros

> 🤝 Automações específicas para distribuição e atribuição de leads de parceiros.

---

### 3.1 Funil Parceiros BT BLUE: Preenche Responsável (Elson)

| Campo | Descrição |
|-------|-----------|
| **Gatilho** | Entrada em `Leads Parceiros BT BLUE` |
| **Filtros/Condições** | `Mesa Homologação` = `Mesa Elson` |
| **Ação** | 👤 Definir Responsável estático: **Elson Zanela** |

---

### 3.2 Funil Parceiros BT BLUE: Preenche Responsável (Yasmin)

| Campo | Descrição |
|-------|-----------|
| **Gatilho** | Entrada em `Leads Parceiros BT BLUE` |
| **Filtros/Condições** | `Mesa Homologação` = `Mesa Yasmin` |
| **Ação** | 👤 Definir Responsável estático: **Yasmin Silva Borgonovi** |

---

### 3.3 Funil Parceiros BBMD: Preenche Responsável

| Campo | Descrição |
|-------|-----------|
| **Gatilho** | Entrada em `Leads Parceiros BBMD` |
| **Filtros/Condições** | `Mesa Homologação` = `Mesa BBMD` |
| **Ação** | 👤 Definir Responsável estático: **Iasmin Barbosa** |

---

## 📊 Resumo das Automações

| Seção | Quantidade |
|-------|------------|
| Automações Gerais de Negócios | 10 (5 × 2 gatilhos) |
| Automações de Funis B2C | 8 |
| Automações de Funis Parceiros | 3 |
| **Total** | **21** |

---

## 📝 Legenda de Símbolos

| Símbolo | Significado |
|---------|-------------|
| 🔀 | Movimentação de card entre etapas |
| 📋 | Duplicação de negócio |
| 👤 | Atribuição de responsável |
| ❌ | Perda de negócio |
| ← | Direção do preenchimento de campo |

---

> **Documento mantido por:** Equipe de Operações CRM  
> **Última atualização:** 26/01/2026
