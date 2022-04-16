package main

import (
	"net/http"

	"github.com/labstack/echo/v4"
	algo "github.com/marfgold1/TubesStima3/src/library/algorithm"
)

func main() {
	e := echo.New()
	algo.KMPMatch("string", "str")
	e.GET("/kmp/:str/:ptr", func(c echo.Context) error {
		str := c.Param("str")
		ptr := c.Param("ptr")
		var res string
		if algo.KMPMatch(str, ptr) != -1 {
			res = "Match!"
		} else {
			res = "Not found!"
		}
		return c.String(http.StatusOK, res)
	})
	e.GET("/bm/:str/:ptr", func(c echo.Context) error {
		str := c.Param("str")
		ptr := c.Param("ptr")
		var res string
		if algo.BMMatch(str, ptr) != -1 {
			res = "Match!"
		} else {
			res = "Not found!"
		}
		return c.String(http.StatusOK, res)
	})
	e.Logger.Fatal(e.Start(":1234"))
}
