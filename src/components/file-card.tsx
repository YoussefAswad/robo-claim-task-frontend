import { FileDto } from "@/api/services/files/types";
import { Card, CardContent, Chip, IconButton, Typography } from "@mui/material";
import { FaFile, FaFileCsv } from "react-icons/fa";
import { FaFilePdf } from "react-icons/fa";
import { FaFileExcel } from "react-icons/fa";
import { AiFillFileUnknown } from "react-icons/ai";
import * as mime from "react-native-mime-types";
import { filesize } from "filesize";
import { MdDelete, MdSdStorage } from "react-icons/md";
import { format as formatDate } from "date-fns";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { useDeleteFile } from "@/api/services/files/hooks";
import { useNotifications } from "@toolpad/core";
import { AiOutlineLoading } from "react-icons/ai";
import { useProfile } from "@/api/services/profile/hooks";
import { useProgress } from "@/api/services/progress/hooks";
import { VscLoading } from "react-icons/vsc";

export const FileCard = ({ file }: { file: FileDto }) => {
  const { data: profile } = useProfile();
  const notification = useNotifications();

  const progress = useProgress({ fileId: file.id });

  const deleteMutation = useDeleteFile();

  const handleDelete = () => {
    deleteMutation.mutate(
      {
        fileId: file.id,
      },
      {
        onSuccess: () => {
          notification.show("File deleted successfully", {
            severity: "success",
          });
        },
        onError: (error) => {
          notification.show(error.message, {
            severity: "error",
          });
        },
      },
    );
  };

  let fileIcon;
  const readablefileType = mime.extension(file.mimeType);
  const readablefileSize = filesize(file.size);
  switch (file.mimeType) {
    case "application/pdf":
      fileIcon = <FaFilePdf className="text-red-700" />;
      break;
    case "application/vnd.ms-excel":
    case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
      fileIcon = <FaFileExcel className="text-green-700" />;
      break;
    case "text/csv":
      fileIcon = <FaFileCsv className="text-green-500" />;
      break;
    default:
      fileIcon = <AiFillFileUnknown />;
  }

  let statusChipColor:
    | "warning"
    | "success"
    | "error"
    | "default"
    | "info"
    | "primary"
    | "secondary";
  switch (file.status) {
    case "pending":
    case "processing":
      statusChipColor = "warning";
    case "completed":
      statusChipColor = "success";
      break;
    case "failed":
      statusChipColor = "error";
      break;
    default:
      statusChipColor = "default";
  }

  return (
    <Card key={file.id}>
      <CardContent>
        <div className="flex gap-2 justify-between items-center">
          <div className="flex gap-2 items-center">
            <Typography gutterBottom variant="h5" component="div">
              {fileIcon}
            </Typography>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              className="line-clamp-1"
            >
              {file.originalName}
            </Typography>
          </div>

          <IconButton
            sx={{ width: "40px", height: "40px" }}
            color="error"
            aria-label="delete"
            onClick={handleDelete}
          >
            {deleteMutation.isPending ? (
              <AiOutlineLoading className="animate-spin" />
            ) : (
              <MdDelete />
            )}
          </IconButton>
        </div>
        {/* <Typography variant="body2" sx={{ color: "text.secondary" }}> */}
        {/*   Lizards are a widespread group of squamate reptiles, with over 6,000 */}
        {/*   species, ranging across all continents except Antarctica */}
        {/* </Typography> */}

        <div className="flex gap-2 items-center">
          <div className="flex gap-1 items-center text-slate-600">
            <FaFile />
            {readablefileType}
          </div>
          <div className="flex gap-1 items-center text-slate-600">
            <MdSdStorage className="size-5" />
            {readablefileSize}
          </div>
        </div>

        <div className="flex items-center h-20">
          {file.dataSnippet ? (
            <>
              {/* @ts-expect-error it works */}
              <SyntaxHighlighter language="json" style={docco}>
                {file.dataSnippet}
              </SyntaxHighlighter>
            </>
          ) : (
            <Typography variant="body2" color="text.secondary">
              No data snippet available
            </Typography>
          )}
        </div>

        <div className="flex justify-between items-center mt-2 text-sm text-slate-600">
          {progress ? (
            <div className="flex gap-2 justify-center items-center">
              <VscLoading className="animate-spin" />
              <span>
                {progress.stage} {progress.progress.toFixed(2)}%
              </span>
            </div>
          ) : (
            <Chip
              color={statusChipColor}
              label={file.status}
              variant="outlined"
            />
          )}
          <div className="flex gap-3">
            {profile?.id !== file.user.id && (
              <span>Uploaded by: {file.user.name}</span>
            )}

            <span>
              Created at:{" "}
              {formatDate(new Date(file.createdAt), "yyyy-MM-dd HH:mm")}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
