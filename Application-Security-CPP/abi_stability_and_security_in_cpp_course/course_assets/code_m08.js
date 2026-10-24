window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples apply Plugins, Extensions, and Third-Party Modules to a concrete, reviewable C++ boundary.",
  "codeExamples": [
    {
      "title": "Negotiate plugin capabilities and lifecycle",
      "language": "cpp",
      "blurb": "The host validates table size, ABI version, required capability bits, and all lifecycle callbacks before initialization.",
      "code": "#include <cstddef>\n#include <cstdint>\n\nenum PluginCapability : std::uint64_t { submit_orders = 1ULL << 0 };\nstruct PluginV1 {\n    std::uint32_t size;\n    std::uint32_t abi_version;\n    std::uint64_t capabilities;\n    int (*initialize)() noexcept;\n    int (*submit)(const void*, std::size_t) noexcept;\n    void (*shutdown)() noexcept;\n};\n\nbool usable_plugin(const PluginV1* plugin) noexcept {\n    return plugin != nullptr &&\n           plugin->size >= sizeof(PluginV1) &&\n           plugin->abi_version == 1 &&\n           (plugin->capabilities & submit_orders) != 0 &&\n           plugin->initialize && plugin->submit && plugin->shutdown;\n}\n"
    },
    {
      "title": "Own a plugin loaded from an application directory",
      "language": "cpp",
      "blurb": "The hard-coded application path is resolved immediately, the entry point is required, and a move-only RAII handle closes the module.",
      "code": "#include <dlfcn.h>\n#include <filesystem>\n#include <stdexcept>\n#include <string_view>\n#include <utility>\n\nclass PluginHandle {\n    void* handle_ = nullptr;\npublic:\n    explicit PluginHandle(void* handle) noexcept : handle_(handle) {}\n    ~PluginHandle() { if (handle_ != nullptr) ::dlclose(handle_); }\n    PluginHandle(const PluginHandle&) = delete;\n    PluginHandle& operator=(const PluginHandle&) = delete;\n    PluginHandle(PluginHandle&& other) noexcept\n        : handle_(std::exchange(other.handle_, nullptr)) {}\n    void* get() const noexcept { return handle_; }\n};\n\nPluginHandle load_orders_plugin(std::string_view file_name) {\n    if (file_name != \"orders-audit.so\") {\n        throw std::invalid_argument(\"plugin not approved\");\n    }\n    const std::filesystem::path path =\n        \"/opt/orders/lib/plugins/orders-audit.so\";\n    PluginHandle plugin(::dlopen(path.c_str(), RTLD_NOW | RTLD_LOCAL));\n    if (plugin.get() == nullptr) throw std::runtime_error(\"plugin load failed\");\n    if (::dlsym(plugin.get(), \"orders_query_plugin\") == nullptr) {\n        throw std::runtime_error(\"entry point missing\");\n    }\n    return plugin;\n}\n"
    }
  ]
};
