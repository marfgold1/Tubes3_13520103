package controllers

import (
	"net/http"

	"github.com/labstack/echo/v4"
	algo "github.com/marfgold1/TubesStima3/src/library/algorithm"
)

func kmpRoute(c echo.Context) error {
	str := c.Param("str")
	ptr := c.Param("ptr")
	var res string
	if algo.KMPMatch(str, ptr) != -1 {
		res = "Match!"
	} else {
		res = "Not found!"
	}
	return c.String(http.StatusOK, res)
}

func bmRoute(c echo.Context) error {
	str := c.Param("str")
	ptr := c.Param("ptr")
	var res string
	if algo.BMMatch(str, ptr) != -1 {
		res = "Match!"
	} else {
		res = "Not found!"
	}
	return c.String(http.StatusOK, res)
}

func Testing(e *echo.Echo) {
	g := e.Group("/testing")
	g.GET("/kmp/:str/:ptr", kmpRoute)
	g.GET("/bm/:str/:ptr", bmRoute)
}
