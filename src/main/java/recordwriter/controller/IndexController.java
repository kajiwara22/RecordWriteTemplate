package recordwriter.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import recordwriter.Repository.RecordRepository;
import recordwriter.model.Record;
import recordwriter.model.RecordForm;

import java.util.Date;

/**
 * Created by KAJIWARAYutaka on 2015/05/17.
 */
@Controller
@RequestMapping(value="/")
public class IndexController {
    @ModelAttribute
    public RecordForm initForm(){
        return new RecordForm();
    }
    @Autowired
    RecordRepository recordRepository;

    @RequestMapping(method = RequestMethod.GET)
    public String showPage(Model model){
        model.addAttribute("records",recordRepository.findAll());
        return "index";
    }

    @RequestMapping(method = RequestMethod.GET,value="/ajaxIndex")
    public String showAjaxPage(Model model){
        model.addAttribute("records",recordRepository.findAll());
        return "indexAjax";
    }

    @RequestMapping(method = RequestMethod.POST)
    public String register(@Validated RecordForm recordForm,BindingResult result){
        if(result.hasErrors()){
            return showPage(null);
        }
        Record record = new Record();
        record.setTitle(recordForm.getTitle());
        record.setRecord(recordForm.getRecord());
        record.setDate(new Date());
        recordRepository.save(record);
        return "redirect:/";
    }
}
