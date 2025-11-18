# Using the Knowledge Index

Required dependencies for this project are documented in the Knowledge Index: `./KNOWLEDGE.md`

Before starting any work, review the contents of `./KNOWLEDGE.md` to discover the expectations on what dependencies (and which versions) and processes you must follow.

Because the index can link to a large amount of content, use this workflow to read relevant content:

1. Review `./KNOWLEDGE.md` and check if there any relevant files.
2. If so, spawn a research subagent with information about your task and a pointer to the files, and ask it to return a relevant summary of context for you to use (but not to do the task). This will prevent you from getting overwhelmed by too much information.
3. Use the information in your task!

Clarify by interviewing the user if the content is not what you expect:

- There's documentation for a dependency you could use, but it isn't the obvious choice. Check if you are expected to use it for the task you are doing.
- If you are not sure whether to use the version of the dependency from the docs, for example, if you discover that there's a more up to date version of the package.
- If there's documentation that appears to be missing that would help.

REPEAT this workflow for every new task. The Knowledge Index is updated frequently, so make sure to review it for changes.

# Using the Tessl Spec Registry

Documentation can be added to the Knowledge Index using the Tessl `registry` tools:

- Search Tessl's Spec Registry for dependency documentation using `search`
- Install relevant docs into the Knowledge Index using `install`

Consult the Spec Registry when deciding which dependencies to install into a project. Likewise, install the documentation for a given dependency after installing it.
