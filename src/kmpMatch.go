package main

func computeFail (pattern string) []int {
	/* Return array storing index of last
	 * occurence of each DNA char in pattern
	 *
	 * Args :
	 *    pattern : string to search for
	 * Returns :
	 *    []int : last occurence of every char in pattern */
	fail := make([]int, len(pattern))
	fail[0] = 0

	m := len(pattern)
	j := 0
	i := 0

	for end := false; !end; end = i >= m {
		if pattern[i] == pattern[j] {
			fail[i] = j + 1
			i++
			j++
		} else if j > 0 {
			j = fail[j-1]
		} else {
			fail[i] = 0
			i++
		}
	}
	return fail
}


func kmpMatch (text, pattern string) int {
	/* Return index of first match of pattern in text,
	 * or -1 if no match 
	 *
	 * Args :
	 *    text : string to search in
	 *    pattern : string to search for 
	 * Returns :
	 *    int : index of first match of pattern in text, or -1 if no match */
	fail := computeFail(pattern)
	n := len(text)
	m := len(pattern)
	i := 0
	j := 0

	for end := false; !end; end = i >= n {
		if pattern[j] == text[i] {
			if j == m - 1 {
				return i - m + 1
			} else {
				i++
				j++
			}
		} else if j > 0 {
			j = fail[j-1]
		} else {
			i++
		}
	}
	return -1
}