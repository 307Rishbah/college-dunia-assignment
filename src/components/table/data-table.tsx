import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  PaginationState,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";
import DataTableContent from "./data-table-content";
import { DataTableToolbar } from "./data-table-toolbar";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchData } from "@/apis/college-apis";
import { columns } from "@/components/table/data-table-column";
import { TailSpin } from "react-loader-spinner";

export default function DataTable<TData>() {
  const [data, setData] = useState<TData[]>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});
  const [pageCount, setPageCount] = useState(0);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 1,
    pageSize: 10,
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchCollegeData() {
      setLoading(true);

      const collegeFilter: string | undefined = columnFilters.find(
        (column) => column.id === "college"
      )?.value as string | undefined;

      try {
        const response = await fetchData(
          pagination.pageIndex,
          pagination.pageSize,
          collegeFilter
        );

        setData((prevData) => [...prevData, ...(response.data as TData[])]);
        setPageCount(response.totalPages);
      } catch (error) {
        console.error("Error fetching college data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchCollegeData();
  }, [pagination, columnFilters]);

  const table = useReactTable({
    data,
    columns,
    manualFiltering: false,
    manualSorting: false,
    manualPagination: true,
    pageCount: pageCount,
    onPaginationChange: setPagination,
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      pagination,
      rowSelection,
      columnFilters,
      columnVisibility,
    },
  });

  const loadMoreData = () => {
    if (pagination.pageIndex < pageCount) {
      setPagination((prev) => ({
        ...prev,
        pageIndex: prev.pageIndex + 1,
      }));
    }
  };

  return (
    <div>
      <DataTableToolbar table={table} />
      <InfiniteScroll
        dataLength={data.length}
        next={loadMoreData}
        hasMore={pagination.pageIndex < pageCount}
        loader={
          loading ? (
            <div className="flex justify-center my-4">
              <TailSpin
                height="40"
                width="40"
                radius="9"
                color="green"
                ariaLabel="loading"
              />
            </div>
          ) : null
        }
        endMessage={
          <p className="text-center my-4">
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <DataTableContent table={table} />
      </InfiniteScroll>
    </div>
  );
}
