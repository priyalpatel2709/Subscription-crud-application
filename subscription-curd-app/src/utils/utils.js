export const validateGridDetails = (gridDetails) => {
  const validationErrors = [];

  for (let i = 0; i < gridDetails.length; i++) {
    const { date, startTime, endTime } = gridDetails[i];

    if (startTime >= endTime) {
      validationErrors.push(
        `Start time should be smaller than end time for row ${i + 1}.`
      );
    }

    for (let j = 0; j < i; j++) {
      const prevGridDetail = gridDetails[j];

      if (date === prevGridDetail.date) {
        if (
          (startTime >= prevGridDetail.startTime &&
            startTime < prevGridDetail.endTime) ||
          (endTime > prevGridDetail.startTime &&
            endTime <= prevGridDetail.endTime)
        ) {
          validationErrors.push(
            `Time conflict for row ${i + 1} with previous row ${j + 1}.`
          );
        }
      }
    }
  }

  return validationErrors;
};
