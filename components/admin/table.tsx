import { type PropsWithChildren } from "react";

export default function Table(
  props: PropsWithChildren<{
    columnNames: string[];
  }>
) {
  return (
    <div className="p-2">
      <div className="mt-4 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-secondary">
                  <tr>
                    {props.columnNames.map((columnName, i) => {
                      if (i === 0) {
                        return (
                          <th
                            scope="col"
                            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-primary sm:pl-6"
                            key={i}
                          >
                            {columnName}
                          </th>
                        );
                      }
                      return (
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-primary"
                          key={i}
                        >
                          {columnName}
                        </th>
                      );
                    })}
                    <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                    >
                      <span className="sr-only">View/Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {props.children}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
