import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  data: { id: string; label: string }[];
  label?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  classname?: string;
}

export const CustomSelect = (props: Props) => {
  const {
    data,
    label,
    onChange,
    placeholder = null,
    classname = "w-full",
  } = props;
  return (
    <Select onValueChange={onChange}>
      <SelectTrigger className={classname}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{label}</SelectLabel>

          {data.map(({ id, label }) => (
            <SelectItem key={id} value={id}>
              {label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
