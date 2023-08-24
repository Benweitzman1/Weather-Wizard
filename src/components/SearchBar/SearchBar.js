import React, { useState } from "react";
import { searchCity } from "../../utils/api";
import { TextField, List, ListItem, Box, Paper } from "@mui/material";
import { useTheme } from "@mui/material/styles";

function SearchBar({ setCity }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const theme = useTheme();

  const handleSearchChange = async (e) => {
    const value = e.target.value;
    if (/^[a-zA-Z\s]*$/.test(value)) {
      setSearchTerm(value);
      try {
        const cityData = await searchCity(value);
        if (cityData && searchTerm.length > 0) {
          let displayResults = filterResult(cityData);
          setResults(displayResults);
        } else {
          setResults([]);
        }
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    }
  };

  const filterResult = (result) => {
    const seen = new Set();
    const uniqueArr = result.filter((obj) => {
      if (!seen.has(obj.LocalizedName)) {
        seen.add(obj.LocalizedName);
        return true;
      }
      return false;
    });
    return uniqueArr.slice(0, 5);
  };

  return (
    <Paper
      elevation={15}
      style={{
        borderRadius: "15px",
        backgroundColor: theme.palette.background.paper,
      }}
    >
      <Box mt={5}>
        <TextField
          fullWidth
          label="Search for city"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
          style={{
            borderRadius: "15px",
            boxShadow: "none",
          }}
        />

        {results.length > 0 && (
          <List component="nav">
            {results.map((result, idx) => (
              <ListItem
                button
                key={idx}
                onClick={() => {
                  setCity(result);
                  setSearchTerm(result.LocalizedName);
                  setResults([]);
                }}
              >
                {result.LocalizedName}
              </ListItem>
            ))}
          </List>
        )}
      </Box>
    </Paper>
  );
}

export default SearchBar;
