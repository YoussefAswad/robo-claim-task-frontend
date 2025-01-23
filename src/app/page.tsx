"use client";
import { useFiles, useSummary } from "@/api/services/files/hooks";
import { FileOrderOptions } from "@/api/services/files/types";
import { useProfile } from "@/api/services/profile/hooks";
import ButtonAppBar from "@/components/app-bar";
import { FileCard } from "@/components/file-card";
import { FileCardSkeleton } from "@/components/file-card-skelrton";
import { ProtectedRoute } from "@/components/protected-routes";
import {
  Card,
  CardContent,
  MenuItem,
  Pagination,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { PieChart } from "@mui/x-charts/PieChart";

import * as mime from "react-native-mime-types";
import { Gauge, gaugeClasses } from "@mui/x-charts";

const fileMimeTypes = [
  "application/pdf",
  "application/vnd.ms-excel",
  "text/csv",
];

export default function Home() {
  const { data: profile } = useProfile();

  const { data: summaryData } = useSummary();

  const pageSize = 10;
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [searchDebounced, setSearchDebounced] = useState("");

  const [fileType, setFileType] = useState("");

  const [totalPages, setTotalPages] = useState(0);

  const [orderField, setOrderField] = useState<FileOrderOptions>("createdAt");
  const [orderType, setOrderType] = useState<"asc" | "desc">("desc");

  const {
    data: filesResponse,
    error: fileError,
    isPending: filesLoading,
  } = useFiles({
    page,
    pageSize,
    sortField: orderField,
    sortType: orderType,
    originalName: searchDebounced,
    mimetype: fileType,
  });

  //debounce search
  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearchDebounced(search);
    }, 500);
    return () => clearTimeout(timeout);
  }, [search]);

  useEffect(() => {
    setPage(1);
  }, [searchDebounced, fileType, orderField, orderType]);

  useEffect(() => {
    if (!filesResponse) {
      return;
    }
    setTotalPages(Math.ceil(filesResponse?.total / pageSize));
  }, [filesResponse]);

  const files = filesResponse?.data;

  // const { sendMessage, lastMessage } = useSocketEvent("progress", {
  //   path: "/api/socket.io",
  //   hostname: window.location.hostname,
  // });

  // useEffect(() => {
  //   if (profile) {
  //     sendMessage({
  //       userId: profile.id,
  //     });
  //   }
  // }, [profile, sendMessage]);

  return (
    <ProtectedRoute>
      <ButtonAppBar />

      <div className="grid grid-cols-1 gap-5 py-5 px-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
        <PieChart
          series={[
            {
              data:
                summaryData?.typeCounts.map((type, index) => ({
                  id: index,
                  value: type.count,
                  label: mime.extension(type.mimeType)
                    ? (mime.extension(type.mimeType) as string)
                    : "Unknown",
                })) ?? [],
            },
          ]}
          height={200}
          title="File Types"
        />
        {/** total files count */}
        <Card
          sx={{ maxWidth: 400, boxShadow: 3, borderRadius: 2, minHeight: 200 }}
        >
          <CardContent sx={{ textAlign: "center", padding: 3 }}>
            <Typography variant="h4" color="text.secondary" gutterBottom>
              Total Files
            </Typography>
            <div className="flex justify-center items-center h-[120px]">
              <Typography variant="h1" fontWeight="bold" color="primary">
                {summaryData?.total ?? "N/A"}
              </Typography>
            </div>
          </CardContent>
        </Card>
        <Card
          sx={{ maxWidth: 400, boxShadow: 3, borderRadius: 2, minHeight: 200 }}
        >
          <CardContent sx={{ textAlign: "center", padding: 3 }}>
            <Typography variant="h4" color="text.secondary" gutterBottom>
              Failiure Rate
            </Typography>
            <div className="flex justify-center items-center h-[120px]">
              <Typography variant="h1" fontWeight="bold" color="error">
                {`${(summaryData?.failiureRate ?? 0) * 100}%`}
              </Typography>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-2 py-5 px-2 md:grid-cols-2 xl:grid-cols-4">
        <TextField
          label="Search"
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <TextField
          select
          label="File Type"
          value={fileType}
          onChange={(e) => setFileType(e.target.value)}
          variant="outlined"
        >
          <MenuItem value="">All</MenuItem>
          {fileMimeTypes.map((type) => (
            <MenuItem key={type} value={type}>
              {mime.extension(type)}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="Order Field"
          value={orderField}
          onChange={(e) => setOrderField(e.target.value as FileOrderOptions)}
          variant="outlined"
        >
          <MenuItem value="createdAt">Created At</MenuItem>
          <MenuItem value="originalName">Name</MenuItem>
          <MenuItem value="size">Size</MenuItem>
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

      <div className="overflow-auto h-[80vh]">
        <div className="grid grid-cols-1 gap-2 p-2 md:grid-cols-2 xl:grid-cols-4">
          {filesLoading &&
            Array.from({ length: pageSize }).map(() => (
              <FileCardSkeleton key={Math.random()} />
            ))}
          {files?.map((file) => <FileCard file={file} key={file.id} />)}
        </div>

        {fileError && (
          <div className="p-3 bg-red-400 rounded-lg text-red-950">
            {fileError.message}
          </div>
        )}
      </div>
      <div className="flex justify-center mb-10">
        <Pagination
          count={totalPages}
          page={page}
          onChange={(e, page) => setPage(page)}
        />
      </div>
    </ProtectedRoute>
  );
}
