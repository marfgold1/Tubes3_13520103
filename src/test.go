package main

import ("fmt")


func main() {
  text := "CGGTTCGGTTGCGGTTCCGGTTAT"
  pattern := "TTAT"
  fmt.Println(bmMatch(text, pattern))
}