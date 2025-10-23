## Features ##
1. Login / Register user
2. Create new task
3. Update status task
4. Filter task by status
5. Delete task

## Screen shots ##
### Login/Register Page
![Login](./screenshots/login.png)
![Register](./screenshots/register.png)

### Task Management Page
![Home](./screenshots/home.png)
![Home - new task](./screenshots/new-task.png)
![Home - edit task](./screenshots/edit-task.png)

## Task Management Module ##
```mermaid
flowchart TD

    subgraph Core
        subgraph Domain
            A["Task Entity"]
        end

        subgraph UseCase
            B["AddTask Use Case"]
            C["GetTask Use Case"]
            D["UpdateTask Use Case"]
            E["DeleteTask Use Case"]
        end
    end

    subgraph Repository
        F["JsonTaskRepository"]
    end

    subgraph Service
        G["TaskService (CreateNewTask, FetchAllTasks, etc.)"]
    end

    subgraph API_Frontend
        H["Next.js API Route (app/api/tasks)"]
        I["React Component or Page"]
    end

    I --> H
    H --> G
    G --> B
    G --> C
    G --> D
    G --> E
    B --> F
    C --> F
    D --> F
    E --> F
    B --> A
    C --> A
    D --> A
    E --> A
```

## Run in local ##
### 1. Clone the repository ###
`git clone https://github.com/yosephfernando/nextjs-todo.git`

### 2. Navigate into the project folder ###
`cd nextjs-todo`

### 3. Install dependencies ###
`npm install`

### 4. Start the development server ###
`npm run dev`

## Run test ##
`npm test`

## Example: Project Module (for future implementation) ##
```mermaid
flowchart TD
    
  subgraph Core
    subgraph Domain
      A[Project Entity]
    end

    subgraph UseCase
      B[AddProject UseCase]
      C[GetProject UseCase]
      D[UpdateProject UseCase]
      E[DeleteProject UseCase]
    end
  end

  subgraph Repository
    F[JsonProjectRepository]
  end

  subgraph Service
    G[ProjectService - includes Create, Fetch, Update, Delete]
  end

  subgraph API_Frontend
    H[Next.js API Route /app/api/projects]
    I[React Component or Page]
  end

  I --> H
  H --> G
  G --> B
  G --> C
  G --> D
  G --> E
  B --> F
  C --> F
  D --> F
  E --> F
  B --> A
  C --> A
  D --> A
  E --> A

```