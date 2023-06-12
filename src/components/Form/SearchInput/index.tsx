import "./index.scss";

import { FC, useState } from "react";

import { Box } from "@mui/system";
import {
  Button,
  Input,
  InputAdornment,
  Slide,
  ClickAwayListener,
} from "@mui/material";

import { Search } from "@mui/icons-material";

const SearchInput: FC = () => {
  const [openSearch, setOpenSearch] = useState(false);

  const handleOpenSearch = () => {
    setOpenSearch(true);
  };

  const handleCloseSearch = () => {
    setOpenSearch(false);
  };

  return (
    <div className="search">
      <ClickAwayListener onClickAway={handleCloseSearch}>
        <Box className="search-container">
          <Button
            id="openSearch"
            variant="text"
            className="search-container__open"
            onClick={handleOpenSearch}
          >
            <Search color="action" />
          </Button>

          <Slide in={openSearch}>
            <Box className="search-container__input">
              <Input
                id="search"
                className="search-container__input__field"
                startAdornment={
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                }
              />

              <Button
                variant="contained"
                size="medium"
                className="search-container__input__button"
                onClick={handleCloseSearch}
              >
                Go!
              </Button>
            </Box>
          </Slide>
        </Box>
      </ClickAwayListener>
    </div>
  );
};

export default SearchInput;
