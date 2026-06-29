import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";

import type {
  ReactNode
} from "react";

import Colors
  from "../../theme/colors";

export interface KCTableColumn<T> {

  id: keyof T;

  label: string;

  width?: number | string;

  align?: "left" | "center" | "right";

  render?: (
    value: T[keyof T],
    row: T
  ) => ReactNode;

}

interface KCTableProps<T> {

  columns: KCTableColumn<T>[];

  rows: T[];

}

function KCTable<T extends { id: string }>({

  columns,

  rows

}: KCTableProps<T>) {

  return (

    <TableContainer

      component={Paper}

      elevation={0}

      sx={{

        backgroundColor: Colors.surface,

        border: `1px solid ${Colors.divider}`,

        borderRadius: 3,

        overflow: "hidden"

      }}

    >

      <Table>

        <TableHead>

          <TableRow>

            {

              columns.map(column => (

                <TableCell

                  key={String(column.id)}

                  width={column.width}

                  align={column.align ?? "left"}

                  sx={{

                    backgroundColor: Colors.surfaceLight,

                    color: Colors.textPrimary,

                    fontWeight: 700,

                    borderBottom: `1px solid ${Colors.divider}`

                  }}

                >

                  {column.label}

                </TableCell>

              ))

            }

          </TableRow>

        </TableHead>

        <TableBody>

          {

            rows.map(row => (

              <TableRow

                key={row.id}

                hover

                sx={{

                  "&:hover": {

                    backgroundColor:
                      "rgba(99,102,241,.05)"

                  }

                }}

              >

                {

                  columns.map(column => (

                    <TableCell

                      key={String(column.id)}

                      align={column.align ?? "left"}

                      sx={{

                        color: Colors.textPrimary,

                        borderBottom:
                          `1px solid ${Colors.divider}`

                      }}

                    >

                      {

                        column.render

                          ?

                          column.render(

                            row[column.id],

                            row

                          )

                          :

                          String(

                            row[column.id] ?? ""

                          )

                      }

                    </TableCell>

                  ))

                }

              </TableRow>

            ))

          }

        </TableBody>

      </Table>

    </TableContainer>

  );

}

export default KCTable;