package main

import (
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"github.com/marfgold1/TubesStima3/src/backend/controllers"
)

func main() {
	e := echo.New()

	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{}))

	controllers.Penyakit(e)
	controllers.Check(e)
	controllers.Testing(e)
	e.Logger.Fatal(e.Start(":5000"))
}
