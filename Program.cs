using Microsoft.EntityFrameworkCore;

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
