window.COURSE_MODULE = {
  "title": "Model Formats and Runtime Options",
  "graphicAlt": "Blank placeholder image for module 3: Model Formats and Runtime Options",
  "narration": "Local Apple Silicon LLM workflows often involve GGUF model files, quantized models, local model managers, llama.cpp-style runtimes, MLX-based tooling, web UIs, and local APIs. Each option has a different balance of usability, performance, model support, and operational control. A beginner may prefer a model manager or web UI, while an engineer may want lower-level control over runtime settings.\n\nGGUF is commonly associated with llama.cpp-style inference workflows. It packages model weights and metadata in a format compatible runtimes can load. Quantized GGUF files are especially popular because they reduce model size and memory requirements. That can make local inference practical on Mac hardware, but quantization choices still affect output quality, speed, and behavior.\n\nMetal acceleration helps supported runtimes use Apple GPU capabilities for faster local inference. MLX is another Apple-oriented machine learning path at a high level, and some tools build around it for efficient local experimentation. OpenAI-compatible local APIs can make it easier to connect web interfaces, coding tools, and scripts to a local model service. The runtime choice should match the intended workflow.\n\nAvoid random model and runtime combinations without testing. A model may load but use the wrong prompt format. A runtime may support one quantization better than another. A web UI may hide settings that matter for performance or privacy. Choose tools based on model support, repeatability, documentation, endpoint needs, and how much operational control you need.",
  "narrationPoints": [
    "Local Apple Silicon LLM workflows often involve GGUF model files, quantized models, local model managers, llama.",
    "GGUF is commonly associated with llama.",
    "Metal acceleration helps supported runtimes use Apple GPU capabilities for faster local inference.",
    "Avoid random model and runtime combinations without testing."
  ]
};
