export default function InputErrorMessage({ message }: { message: string }) {
  return (
    <div className="text-red-600">
      {message}
    </div>
  );
}
