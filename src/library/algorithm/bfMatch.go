package algorithm

func BFMatch(text, pattern string) (int, int) {
	/* Return index of first occurence of pattern
	 * in text, or -1 if not found
	 *
	 * Args :
	 *    text : string to search in
	 *    pattern : string to search for
	 * Returns :	
	 *	  tuple of (int, int)
	 *    	int : index of first occurence of pattern in text 
	 *	  	int : maximum count of similarity in a sequence		*/

	m := len(pattern)
	n := len(text)

	i := 0
	j := 0
	i_at_max_count := 0
	count := 0
	max_count := 0

	/* Loop through text until pattern is found of until the end of the text */
	for i < n - m + 1 {
		if text[i + j] == pattern[j] {	// If the current char in text matches the current char in pattern
			count++
		}
		if j == m - 1 {		// If the pattern has reached the end
			j = 0
			if (count > max_count) {
				max_count = count
				i_at_max_count = i
			}
			if max_count == m {		// If all chars in pattern match
				return i, max_count
			}
			count = 0
			i++
		} else {
			j++
		}
	}

	return i_at_max_count, max_count
}