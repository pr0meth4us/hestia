package dev.prometheus.grouping.exclude;


import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@RestController
@Setter
@Getter
public class ExclusionUtility {
    private List<String> classList;
    private static TempoRepo repository;
    @Autowired
    public ExclusionUtility(TempoRepo repository) {
        this.repository = repository;
        this.classList = convertStudentListToStringList(repository.findAll());
    }

    private List<String> convertStudentListToStringList(List<Exclude> students) {
        List<String> stringList = new ArrayList<>();
        for (Exclude student : students) {
            stringList.add(student.getName());
        }
        return stringList;
    }

    public ArrayList<String> getShuffledList() {
        ArrayList<String> shuffledArrayList = new ArrayList<>(classList);
        Collections.shuffle(shuffledArrayList);
        return shuffledArrayList;
    }


    public ArrayList<ArrayList<String>> getGroupsByNumberOfGroups(int numberOfGroups) {
        ArrayList<ArrayList<String>> groups = new ArrayList<>();
        ArrayList<String> ShuffleList = new ArrayList<>(getShuffledList());

        for (int i = 0; i < numberOfGroups; i++) {
            groups.add(new ArrayList<>());
        }

        for (int i = 0; i < ShuffleList.size(); i++) {
            groups.get(i % numberOfGroups).add(ShuffleList.get(i));
        }

        return groups;
    }

    public ArrayList<ArrayList<String>> getGroupByGroupSize(int groupSize) {
        ArrayList<ArrayList<String>> groups = new ArrayList<>();
        ArrayList<String> ShuffleList = new ArrayList<>(getShuffledList());

        int remainder = ShuffleList.size() % groupSize;

        if (remainder == 0){
            for (int i = 0; i < ShuffleList.size(); i += groupSize) {
                groups.add(new ArrayList<>(ShuffleList.subList(i, i + groupSize)));
            }
        } else {
            if (remainder > groupSize/2){
                for (int i = 0; i < ShuffleList.size() - remainder; i += groupSize) {
                    groups.add(new ArrayList<>(ShuffleList.subList(i, i + groupSize)));
                }
                groups.add(new ArrayList<>(ShuffleList.subList(ShuffleList.size() - remainder, ShuffleList.size())));
            } else {
                for (int i = 0; i < ShuffleList.size() - remainder; i += groupSize) {
                    groups.add(new ArrayList<>(ShuffleList.subList(i, i + groupSize)));
                }
                for (int i = ShuffleList.size() - remainder; i < ShuffleList.size(); i++) {
                    groups.get(i - (ShuffleList.size() - remainder)).add(ShuffleList.get(i));
                }
            }

        }
        return groups;
    }

    public static boolean reshuffle(ArrayList<ArrayList<String>> groups) {
        boolean reshuffle = false;
//        for (ArrayList<String> group: groups) {
//            boolean conflict1 = group.contains(kittie) && group.contains(dogie);
//            boolean conflict2 = group.contains(kittie) && group.contains(noodle);
//            if (conflict1 || conflict2) {
//                reshuffle = true;
//                break;
//            }
//        }

        return reshuffle;
    }


    public static class getShuffledList extends ArrayList<String> {
    }
}
