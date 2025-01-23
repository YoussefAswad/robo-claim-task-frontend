"use client";
import client from "@/api/client";
import { components } from "@/api/schema";
import ButtonAppBar from "@/components/app-bar";
import { MenuItem, TextField } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useRef, useState } from "react";

const logTypes = ["error", "info", "warning"];

export default function Logs() {
  const [search, setSearch] = useState("");
  const [searchDebounced, setSearchDebounced] = useState("");
  const [logType, setLog] = useState("");

  const [orderType, setOrderType] = useState<"asc" | "desc">("desc");

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 30,
  });

  const { data: logs, isPending } = useQuery({
    queryKey: [
      "logs",
      {
        page: paginationModel.page,
        pageSize: paginationModel.pageSize,
        search: searchDebounced,
        type: logType,
        sortType: orderType,
      },
    ],
    queryFn: async () => {
      const { data } = await client.GET("/logs", {
        params: {
          query: {
            page: paginationModel.page + 1,
            pageSize: paginationModel.pageSize,
            search: searchDebounced,
            status: logType as any,
            sortType: orderType,
          },
        },
      });
      return data;
    },
  });

  // Some API clients return undefined while loading
  // Following lines are here to prevent `rowCount` from being undefined during the loading
  const rowCountRef = useRef(logs?.total || 0);

  const rowCount = useMemo(() => {
    if (logs?.total !== undefined) {
      rowCountRef.current = logs.total;
    }
    return rowCountRef.current;
  }, [logs?.total]);

  //debounce search
  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearchDebounced(search);
    }, 500);
    return () => clearTimeout(timeout);
  }, [search]);

  useEffect(() => {
    setPaginationModel((prev) => ({
      ...prev,
      page: 0,
    }));
  }, [searchDebounced]);

  const columns: GridColDef<components["schemas"]["LogDto"]>[] = [
    {
      field: "type",
      headerName: "Type",
      flex: 1,
      renderCell: (params) => {
        let color;

        switch (params.row.type) {
          case "error":
            color = "text-red-500";
            break;
          case "info":
            color = "text-blue-500";
            break;
          case "warning":
            color = "text-yellow-500";
            break;
          default:
            color = "text-gray-500";
        }

        return <span className={color}>{params.row.type}</span>;
      },
    },

    {
      field: "user",
      headerName: "User",
      flex: 1,
      valueGetter: (_, row) => row.user?.email ?? "N/A",
    },

    {
      field: "createdAt",
      headerName: "Created At",
      flex: 1,
    },

    {
      field: "action",
      headerName: "Action",
      flex: 1,
    },
  ];

  return (
    <div>
      <ButtonAppBar />
      <div className="p-5">
        <div className="grid grid-cols-1 gap-2 py-5 px-2 md:grid-cols-2 xl:grid-cols-4">
          <TextField
            label="Search"
            variant="outlined"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <TextField
            select
            label="Log Type"
            value={logType}
            onChange={(e) => setLog(e.target.value)}
            variant="outlined"
          >
            <MenuItem value="">All</MenuItem>
            {logTypes.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            label="Order Type"
            value={orderType}
            onChange={(e) => setOrderType(e.target.value as "asc" | "desc")}
            variant="outlined"
          >
            <MenuItem value="asc">Ascending</MenuItem>
            <MenuItem value="desc">Descending</MenuItem>
          </TextField>
        </div>

        <DataGrid
          rows={logs?.data ?? []}
          getRowId={(row) => row.id}
          columns={columns}
          rowCount={rowCount}
          loading={isPending}
          pageSizeOptions={[30, 50, 100]}
          paginationModel={paginationModel}
          paginationMode="server"
          onPaginationModelChange={setPaginationModel}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </div>
    </div>
  );
}
