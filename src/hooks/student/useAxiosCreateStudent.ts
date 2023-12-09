import { CreateStudent } from "../../types/dto/CreateStudent.ts";
import { useEffect, useState } from "react";
import axios from "axios";
import urlApi from "../../constants/UrlApi.ts";
import { toast } from "react-toastify";

const useAxiosCreateStudent = (payload: CreateStudent, token: string) => {};

export default useAxiosCreateStudent;
