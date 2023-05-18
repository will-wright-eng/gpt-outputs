Sure, here's an example bash script that loops through two arrays parsed from comma-separated strings:

```bash
#!/bin/bash

# Define two comma-separated strings
string1="apple,banana,orange"
string2="red,green,yellow"

# Parse the strings into arrays
IFS=',' read -ra array1 <<< "$string1"
IFS=',' read -ra array2 <<< "$string2"

# Loop through the arrays
for i in "${!array1[@]}"; do
  echo "Fruit: ${array1[$i]}, Color: ${array2[$i]}"
done
```

This script defines two comma-separated strings (`string1` and `string2`), then uses the `read` command with the `IFS` (Internal Field Separator) set to comma to parse them into arrays (`array1` and `array2`). It then loops through the arrays using a `for` loop and the `${!array[@]}` syntax to get the index of each element, and prints out the corresponding fruit and color using array subscripting (`${array1[$i]}` and `${array2[$i]}`).
