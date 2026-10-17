window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "Break shared-ownership cycles by choosing one owning direction and making the reverse relationship weak.",
  "codeExamples": [
    {
      "title": "Model a project-task relationship without a shared cycle",
      "language": "cpp",
      "blurb": "Private construction, deleted copy and move operations, and the shared factory guarantee that weak_from_this produces a meaningful project lifetime token.",
      "code": "#include <memory>\n#include <string>\n#include <utility>\n#include <vector>\n\nclass Project;\n\nclass Task {\npublic:\n    Task(std::string title, std::weak_ptr<Project> project)\n        : title_(std::move(title)), project_(std::move(project)) {}\n\n    bool project_alive() const noexcept {\n        return !project_.expired();\n    }\n\nprivate:\n    std::string title_;\n    std::weak_ptr<Project> project_;\n};\n\nclass Project : public std::enable_shared_from_this<Project> {\npublic:\n    static std::shared_ptr<Project> create() {\n        return std::shared_ptr<Project>{new Project};\n    }\n\n    Project(const Project&) = delete;\n    Project& operator=(const Project&) = delete;\n    Project(Project&&) = delete;\n    Project& operator=(Project&&) = delete;\n\n    std::shared_ptr<Task> add_task(std::string title) {\n        auto task = std::make_shared<Task>(\n            std::move(title), weak_from_this()\n        );\n        tasks_.push_back(task);\n        return task;\n    }\n\nprivate:\n    Project() = default;\n    std::vector<std::shared_ptr<Task>> tasks_;\n};"
    },
    {
      "title": "Prove the weak back-reference does not retain the project",
      "language": "cpp",
      "blurb": "Compile-time checks enforce shared-only construction semantics, and a task may outlive its project without retaining the ownership graph.",
      "code": "#include <type_traits>\n\nstatic_assert(!std::is_copy_constructible_v<Project>);\nstatic_assert(!std::is_copy_assignable_v<Project>);\nstatic_assert(!std::is_move_constructible_v<Project>);\nstatic_assert(!std::is_move_assignable_v<Project>);\n\nint test_project_cycle_is_broken() {\n    auto project = Project::create();\n    auto task = project->add_task(\"review\");\n    if (!task->project_alive()) return 1;\n    project.reset();\n    if (task->project_alive()) return 2;\n    return 0;\n}"
    }
  ]
};
