interface ISearchRes {
  CreatedAt: string;
  DeletedAt: string | null;
  ID: number;
  Match: number;
  Pengguna: string;
  Penyakit: string;
  Result: boolean;
  UpdatedAt: string;
}

export default ISearchRes;
