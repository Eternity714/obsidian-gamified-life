import * as React from "react";
import { GamifiedLifeInterface } from "@/GamifiedLifeInterface";

export const ApiContext = React.createContext<GamifiedLifeInterface | undefined>(undefined);
