def process_array(string_array):
    i = 0
    while i < len(string_array) - 1:  # Iterate until the second last element
        try:
            # Attempt to convert both current and next elements to float
            current_num = float(string_array[i])
            next_num = float(string_array[i+1])
            # If conversion is successful, sum them and replace the current element with their sum
            string_array[i] = str(current_num + next_num)
            # Remove the next element as it's been added to the current one
            del string_array[i+1]
        except ValueError:
            # Move to the next element if either current or next can't be converted to a number
            i += 1
        else:
            # If numbers were successfully added, stay at the same index
            # as the next element has shifted to the current position
            continue
    return string_array

def process_array_reverse(string_array):
    i = len(string_array) - 2  # Start from the second last element
    while i >= 0:  # Iterate to the first element
        try:
            # Check if the current or next (in reverse) element can be converted to float
            float(string_array[i])
            can_convert_i = True
        except ValueError:
            can_convert_i = False
        try:
            float(string_array[i + 1])
            can_convert_i_next = True
        except ValueError:
            can_convert_i_next = False

        # If both cannot be converted to numbers, concatenate
        if not can_convert_i and not can_convert_i_next:
            string_array[i] = string_array[i] + string_array[i + 1]
            del string_array[i + 1]
        i -= 1  # Move to the previous element

    return string_array

def process_array_both_halves_reversed(array):
    # Calculate the midpoint of the array
    mid_point = len(array) // 2
    
    # Reverse the first half
    first_half_reversed = array[:mid_point][::-1]
    
    # Reverse the second half
    second_half_reversed = array[mid_point:][::-1]
    
    # Concatenate the reversed halves
    processed_array = first_half_reversed + second_half_reversed
    
    return processed_array

# Example usage
string_array = ['12', 'hello', 'world', '10.75', '3', 'world', '3.25', 'end']
print(string_array)
processed_array = process_array(string_array)
print(processed_array)

# Corrected example usage
string_array_corrected = ['12', 'hello', 'world', '10.75', '3', 'world', '3.25', 'end']
processed_array_corrected = process_array_reverse(string_array_corrected)
print(processed_array_corrected)

# Example usage
array = ['12', 'hello', 'world', '10.75', '3', 'world', '3.25', 'end']
processed_array = process_array_both_halves_reversed(array)
print(processed_array)




