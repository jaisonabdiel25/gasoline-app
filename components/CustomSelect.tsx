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
  defaultValue?: string;
}

export const CustomSelect = (props: Props) => {
  const {
    data,
    label,
    onChange,
    defaultValue,
    placeholder = null,
    classname = "w-full",
  } = props;
  return (
    <Select defaultValue={defaultValue} onValueChange={onChange}>
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
