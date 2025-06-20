# Product Requirements Document (PRD) 
*Library Management System with AI Search & Summarization*
----------
## Overview
### 1.1 Purpose
A web-based Library Management System that combines traditional database search with AI-powered semantic search (Jina + Qdrant) and AI-generated book/chapter summaries (OpenRouter AI). Includes book loan management for users.

### 1.2 Key Features
-   **Hybrid Search**: Database (PostgreSQL) + Semantic Search (Jina + Qdrant).
-   **AI Summarization**: Chapter-wise & full-book summaries via OpenRouter AI.
-   **Loan Management**: Users can borrow/return books with due dates.
-   **User Roles**: Guest, Member, Admin.

## Features & Requirements
### 2.1 Search System
#### Database Search (PostgreSQL)
-   **Keyword Search**: Title, author, ISBN, category.
-   **Filters**:
    -   Availability (in-stock/loaned).
    -   Publication year, rating, popularity.
-   **Full-Text Search**: Book descriptions/content (PostgreSQL **`tsvector`**).

#### AI Semantic Search (Jina + Qdrant)
-   **Embedding Model**: Jina AI (**`jina-embeddings-v2`**) to convert queries/book data into vectors.
-   **Vector DB**: Qdrant stores embeddings for:
    -   Book titles, synopses, extracted text (from PDFs/EPUBs).
-   **Features**:
    -   "Find similar books" (semantic match, not just keywords).
    -   Query suggestions (e.g., "books like Harry Potter but sci-fi").

### 2.2 AI Summarization (OpenRouter AI)
-   **Chapter Summaries**:
    -   Extracted from uploaded book files (PDF/EPUB).
    -   Stored in PostgreSQL after generation.
-   **Full-Book Summaries**:
    -   1-2 paragraph summaries (toggleable styles: bullet points/narrative).
    -   Available on book details page.
-   **Admin Controls**:
    -   Regenerate summaries manually.
    -   Edit AI outputs.

### 2.3 Loan Management
-   **User Flow**:
    1.  Member searches/selects a book.
    2.  Clicks "Borrow" → selects loan duration (7/14/30 days).
    3.  Admin approves (if manual approval enabled).
    4.  Due date tracked; reminders sent (email/in-app).
-   **Restrictions**:
    -   Max 5 active loans per user.
    -   Late returns penalize borrowing privileges.
-   **Admin Actions**:
    -   Force return/extend loans.
    -   View loan history per user/book.

### 2.4 User Roles
|Role            |Permissions                  			   |
|----------------|-----------------------------------------|
|Guest			 |Search, view books/summaries.            |
|Member          |Borrow/return books, save favorites.     |
|Admin           |Add/edit books, manage loans, AI tools.  |


## 3. Technical Architecture
### 3.1 Stack
| Component |Technology         							|Use Case                  			   |
|-----------|-----------------------------------------------------|-----------------------------------------|
|Frontend	|NuxtJS 3 (Vue 3)			 						|SSR, interactive UI (book reader).|
|Backend	|Laravel 12          						|API, auth, loan logic, AI calls.     |
|Database	|PostgreSQL								           |Books, users, loans, summaries.  |
|Vector DB	|Qdrant           								|Stores/book embeddings for search.  |
|AI Models	|Jina (embeddings) + OpenRouter (GPT-4/Claude)           |Search/summarization.  |



### 3.2 Data Flow for AI Search
1.  User submits query: "space adventure books for teens".
2.  Laravel sends query to Jina → generates embedding.
3.  Qdrant finds top 5 book vectors matching the query.
4.  Results merged with PostgreSQL data (availability, ratings).
5.  UI displays hybrid results (DB + semantic matches).

### 3.3 API Endpoints (Sample)
-   **`POST /api/search`** (hybrid search).
-   **`GET /api/books/{id}/summary`** (fetch AI summary).
-   **`POST /api/loans`** (create loan).
-   **`PATCH /api/loans/{id}/return`** (return book).

## 4. UI/UX Wireframes (Key Screens)
### 4.1 Homepage
-   Hero section: "Search books by keyword or description".
-   Featured books (AI-recommended).

### 4.2 Book Details Page
-   Summary toggle (AI-generated).
-   "Borrow" button (disabled if unavailable).
-   "Similar books" section (Qdrant-powered).

### 4.3 User Dashboard
-   Active loans (with due dates).
-   Borrowing history.
-   Saved summaries.

## 5. Success Metrics
-   **Search Accuracy**:
    -   80%+ click-through rate on top 3 semantic results.
-   **Loan Management**:
    -   Reduce late returns by 30% via reminders.
-   **AI Adoption**:
    -   50%+ users use summaries before borrowing.

## 6. Risks & Mitigation

| Risk						| Mitigation						|
|---------------------------|-----------------------------------|
| Jina/Qdrant latency 		| Cache frequent queries 			|
| OpenRouter cost overrun 	| Limit summary token length 		|
| Loan abuse (no returns) 	| Penalty system (temporary bans) 	|


## 7. Appendix
-   **Future Features**:
    -   AI chat for book recommendations.
    -   "Community summaries" (user-contributed).
-   **Competitors**:
    -   Libby (lacks AI search/summaries).
    -   Goodreads (no loan management).

----------