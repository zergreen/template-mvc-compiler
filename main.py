def sum_adjacent_numbers(string_array):
    """Sum adjacent elements if both can be converted to numbers."""
    i = 0
    while i < len(string_array) - 1:
        try:
            current_num = float(string_array[i])
            next_num = float(string_array[i + 1])
            string_array[i] = str(current_num + next_num)
            del string_array[i + 1]
        except ValueError:
            i += 1
    return string_array

def concatenate_non_numbers(string_array):
    """Concatenate adjacent elements if both cannot be converted to numbers."""
    i = len(string_array) - 2
    while i >= 0:
        can_convert_i = can_convert_i_next = False
        try:
            float(string_array[i])
            can_convert_i = True
        except ValueError:
            pass
        try:
            float(string_array[i + 1])
            can_convert_i_next = True
        except ValueError:
            pass

        if not can_convert_i and not can_convert_i_next:
            string_array[i] = string_array[i] + string_array[i + 1]
            del string_array[i + 1]
        i -= 1
    return string_array

def reverse_halves(array):
    """Reverse both halves of the array and concatenate them."""
    mid_point = len(array) // 2
    first_half_reversed = array[:mid_point][::-1]
    second_half_reversed = array[mid_point:][::-1]
    return first_half_reversed + second_half_reversed

def print_example_usage():
    original_array = ['12', 'hello', 'world', '10.75', '3', 'world', '3.25', 'end']
    print("Original array:", original_array)

    processed_sum = sum_adjacent_numbers(original_array.copy())
    print("After summing adjacent numbers:", processed_sum)

    processed_concat = concatenate_non_numbers(original_array.copy())
    print("After concatenating non-numbers:", processed_concat)

    processed_reverse = reverse_halves(original_array)
    print("After reversing halves:", processed_reverse)

if __name__ == "__main__":
    print_example_usage()