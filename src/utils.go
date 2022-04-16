package main

func getDnaCode(c byte) int {
	/* Return DNA code for char c 
	 * A = 0
	 * G = 1
	 * C = 2
	 * T = 3 */
	var code int
	switch c {
	case 'A':
	  code = 0
	case 'G':
	  code = 1
	case 'C':
	  code = 2
	case 'T':
	  code = 3
	}
	return code
  }
  