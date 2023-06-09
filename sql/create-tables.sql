-- Boards contain meta information about boards as well as set the root board view.
CREATE TABLE aac_board_meta (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    owner UUID REFERENCES auth.users (id) ON DELETE CASCADE,
    root_board UUID REFERENCES aac_board_page (id) UNIQUE NOT NULL, --  There's no point having multiple metas for the table root board
    version int8 NOT NULL DEFAULT 0, -- Used to know whether or not to update the local copy
    settings JSONB NOT NULL
);

-- Represents a particular page which is a constituent of a board
CREATE TABLE aac_board_page (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    owner UUID NOT NULL REFERENCES auth.users (id) ON DELETE CASCADE,
    board_meta UUID NOT NULL REFERENCES aac_board_meta (id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    buttons JSONB NOT NULL,
    images JSONB NOT NULL,
);