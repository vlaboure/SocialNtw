﻿using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class activityEntityAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Activities",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Title = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true),
                    Category = table.Column<string>(nullable: true),
                    City = table.Column<string>(nullable: true),
                    Venue = table.Column<string>(nullable: true),
                    Date = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Activities", x => x.Id);
                });

            migrationBuilder.UpdateData(
                table: "Values",
                keyColumn: "Id",
                keyValue: 1,
                column: "Name",
                value: "value 101");

            migrationBuilder.UpdateData(
                table: "Values",
                keyColumn: "Id",
                keyValue: 2,
                column: "Name",
                value: "value 102");

            migrationBuilder.UpdateData(
                table: "Values",
                keyColumn: "Id",
                keyValue: 3,
                column: "Name",
                value: "value 103");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Activities");

            migrationBuilder.UpdateData(
                table: "Values",
                keyColumn: "Id",
                keyValue: 1,
                column: "Name",
                value: "101");

            migrationBuilder.UpdateData(
                table: "Values",
                keyColumn: "Id",
                keyValue: 2,
                column: "Name",
                value: "102");

            migrationBuilder.UpdateData(
                table: "Values",
                keyColumn: "Id",
                keyValue: 3,
                column: "Name",
                value: "103");
        }
    }
}
