// src/components/DepartmentList.tsx
import React, { useState } from "react";

import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { departments as initialDepartments } from "./departments";

interface Department {
  id: number;
  name: string;
  selected: boolean;
  subDepartments: SubDepartment[];
}

interface SubDepartment {
  id: number;
  name: string;
  selected: boolean;
}

const DepartmentList: React.FC = () => {
  const [departments, setDepartments] =
    useState<Department[]>(initialDepartments);

  const handleDepartmentChange = (departmentId: number) => {
    setDepartments((prevDepartments) =>
      prevDepartments.map((department) =>
        department.id === departmentId
          ? {
              ...department,
              selected: !department.selected,
              subDepartments: department.subDepartments.map((sub) => ({
                ...sub,
                selected: !department.selected,
              })),
            }
          : department
      )
    );
  };

  const handleSubDepartmentChange = (departmentId: number, subId: number) => {
    setDepartments((prevDepartments) =>
      prevDepartments.map((department) =>
        department.id === departmentId
          ? {
              ...department,
              subDepartments: department.subDepartments.map((sub) =>
                sub.id === subId ? { ...sub, selected: !sub.selected } : sub
              ),
              selected: department.subDepartments.every((sub) =>
                sub.id === subId ? !sub.selected : sub.selected
              ),
            }
          : department
      )
    );
  };

  const isIndeterminate = (subDepartments: SubDepartment[]) => {
    const selectedCount = subDepartments.filter((sub) => sub.selected).length;
    return selectedCount > 0 && selectedCount < subDepartments.length;
  };

  return (
    <div>
      {departments.map((department) => (
        <Accordion key={department.id}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel-${department.id}-content`}
            id={`panel-${department.id}-header`}
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={department.selected}
                  indeterminate={isIndeterminate(department.subDepartments)}
                  onChange={() => handleDepartmentChange(department.id)}
                />
              }
              label={<Typography>{department.name}</Typography>}
            />
          </AccordionSummary>
          <AccordionDetails>
            <List>
              {department.subDepartments.map((sub) => (
                <ListItem key={sub.id}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={sub.selected}
                        onChange={() =>
                          handleSubDepartmentChange(department.id, sub.id)
                        }
                      />
                    }
                    label={<ListItemText primary={sub.name} />}
                  />
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default DepartmentList;
