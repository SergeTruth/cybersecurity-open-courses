window.COURSE_CODE_MODULE = {
  "title": "Code Examples",
  "codeIntro": "These examples turn 'Razor Pages, MVC, and Form Protection' into concrete defensive .NET review patterns. Examples are focused supporting fragments, not a complete application. C# requires .NET 8 and C# 12, with Microsoft.AspNetCore.App for web-framework APIs; place member declarations in an application type and include standard namespace imports. Extra package requirements are stated where used. Bootstrap configuration, providers, and private storage are trusted application inputs, never request-controlled policy.",
  "codeExamples": [
    {
      "title": "Require antiforgery validation on unsafe MVC actions",
      "language": "csharp",
      "blurb": "AddControllersWithViews registers framework token support. AutoValidateAntiforgeryToken validates unsafe HTTP methods; render forms with the built-in Form Tag Helper.",
      "code": "using Microsoft.AspNetCore.Mvc;\npublic static void AddProtectedMvc(IServiceCollection services)\n{\n    services.AddControllersWithViews(options => options.Filters.Add(new AutoValidateAntiforgeryTokenAttribute()));\n}\n// Pipeline: UseRouting, UseAuthentication, UseAuthorization, MapControllers.\n// The global filter runs before unsafe controller actions. Do not override it with IgnoreAntiforgeryToken.\n"
    },
    {
      "title": "Generate a token through the MVC framework",
      "language": "csharp",
      "blurb": "Use this helper while rendering the authenticated form response; emit the returned IHtmlContent through Razor, not string concatenation. Razor Pages and the Form Tag Helper provide equivalent built-in integration.",
      "code": "using Microsoft.AspNetCore.Html;\nusing Microsoft.AspNetCore.Mvc.Rendering;\npublic static IHtmlContent RenderRequestToken(IHtmlHelper html) => html.AntiForgeryToken();\n// The POST must be covered by ValidateAntiForgeryToken or the global unsafe-method filter.\n"
    }
  ]
};
