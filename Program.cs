using Microsoft.EntityFrameworkCore;

//cd API
//dotnet user-secrets set "ConnectionStrings:Default" "Server=tcp:interview-tests.database.windows.net,1433;Initial Catalog=test;Persist Security Info=False;User ID=interviewee;Password=8qCRg5EL38cpgeph;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;"
//cd Client
//npm i
//npm run startDev

//see: https://docs.microsoft.com/en-us/aspnet/core/fundamentals/configuration/?view=aspnetcore-6.0 for default configs
var builder = WebApplication.CreateBuilder(args);

if(builder.Environment.EnvironmentName != "Development") 
{
    throw new NotImplementedException();
}

builder.Services.AddControllers();

var ConnectionString = builder.Configuration["ConnectionStrings:Default"]; //This only works for Development environment.
builder.Services.AddDbContext<API.Context.DBContext>(options => options.UseSqlServer(ConnectionString));

var app = builder.Build();

app.UseDefaultFiles();
app.MapControllers();
app.UseStaticFiles();

app.Run();
