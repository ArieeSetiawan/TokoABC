interface PaginationResult {
    page: number;
    per_page: number;
    total: number;
    total_page: number;
    next: boolean;
    prev: boolean
  }
  
  export default function paginate({
    page,
    per_page,
    count,
    totalData,
  }: {
    page: number;
    per_page: number;
    count: number;
    totalData: number;
  }): PaginationResult {
    const total_page = Math.ceil(count / per_page)
    const next = page < total_page
    const prev = page > 1
    return {
      page,
      per_page,
      total: count,
      total_page,
      next,
      prev
    };
  }
  