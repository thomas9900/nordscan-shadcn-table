import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface InputFormProps {
  onHoursSubmit: (hours: number, comment: string) => void;
}

const FormSchema = z.object({
  hours: z
    .string()
    .refine((value) => !isNaN(Number(value)), {
      message: 'hours must be a valid number.',
    })
    .refine((value) => value.length >= 1, {
      message: 'hours must be at least 1 character.',
    }),
  comment: z.string(), // Add comment validation
});

export function InputForm({ onHoursSubmit }: InputFormProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      hours: '',
      comment: '', // Add default value for comment
    },
  });

  // Watch for changes to the form values
  const watchedValues = form.watch();

  function onSubmit() {
    const hoursAsNumber = Number(watchedValues.hours);

    const isConfirmed = window.confirm(
      'Click OK to confirm or Cancel to abort.'
    );

    if (isConfirmed) {
      onHoursSubmit(hoursAsNumber, watchedValues.comment);
      alert('Submission successful!');
    } else {
      alert('Submission canceled.');
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-1/6 space-y-6">
        {/* Hours input field */}
        <FormField
          control={form.control}
          name="hours"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hours</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormDescription>
                The amount of hours worked during the selected period
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Larger Comment input field */}
        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Comment</FormLabel>
              <FormControl>
                <Textarea 
                  {...field}
                  style={{ height: '100px' }} // Adjust the height as needed
                />
              </FormControl>
              <FormDescription>
                Optional comment for the work period
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit button */}
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
