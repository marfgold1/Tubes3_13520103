package controllers

import (
	"fmt"
	"net/http"

	"github.com/labstack/echo/v4"
	algo "github.com/marfgold1/TubesStima3/src/library/algorithm"
)

func kmpRoute(c echo.Context) error {
	str := c.Param("str")
	ptr := c.Param("ptr")
	var res string
	idx, sublen := algo.KMPMatch(str, ptr)
	if idx != -1 {
		res = fmt.Sprintf("Match! %f%%", float64(sublen)/float64(len(str))*100.0)
	} else {
		res = fmt.Sprintf("Not found! %f%%", float64(sublen)/float64(len(str))*100.0)
	}
	return c.String(http.StatusOK, res)
}

func bmRoute(c echo.Context) error {
	str := c.Param("str")
	ptr := c.Param("ptr")
	var res string
	idx, sublen := algo.BMMatch(str, ptr)
	if idx != -1 {
		res = fmt.Sprintf("Match! %f%%", float64(sublen)/float64(len(str))*100.0)
	} else {
		res = fmt.Sprintf("Not found! %f%%", float64(sublen)/float64(len(str))*100.0)
	}
	return c.String(http.StatusOK, res)
}

func Testing(e *echo.Echo) {
	g := e.Group("/testing")
	g.GET("/kmp/:str/:ptr", kmpRoute)
	g.GET("/bm/:str/:ptr", bmRoute)
}
