using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Small.API.Migrations
{
    /// <inheritdoc />
    public partial class AddNewColumnToBlogPost : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "age",
                table: "SmallPosts",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "age",
                table: "SmallPosts");
        }
    }
}
